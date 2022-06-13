//SPDX-License-Identifier: MIT
pragma solidity >= 0.3.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Amative is ReentrancyGuard, IERC721Receiver, ERC721URIStorage{
    using Counters for Counters.Counter;
    //Counters.Counter private _tokenId;
    Counters.Counter private _itemsSold;
    Counters.Counter private _tokenIdTracker;

    address payable immutable marketOwner;

    uint256 listingPrice = 0.025 ether;

    uint256 bidIndex = 0;

    uint256 minimumBid = 0.01 ether;

    string private _baseURIextended;

    constructor() ERC721('Amative', 'AMT'){
        marketOwner = payable(msg.sender);
    }

    modifier onlyOwner(){
        require(msg.sender == marketOwner);
        _;
    }

    modifier validAddress(address _address) {
        require(_address != address(0), "Not a valid address");
        _;
    }

    struct MarketItem{
        uint256 tokenId;
        uint256 price;
        address payable seller;
        address payable owner;
        bool sold;
    }

    struct Bid{
        uint256 amount;
        address payable sender;
        mapping(uint256 => MarketItem) bidders;
    }

    MarketItem[] public itemsInMarket;

    mapping(uint256 => MarketItem) private idToMarketItem; 

    mapping(uint256 => string) _tokenURIs;
    mapping(address => uint256) _getNftId;

    mapping(uint256 => address) _getNftOwnerId;
    mapping(uint256 => uint256) tokenIds;
    mapping(uint256 => address) itemToOwner;
    mapping(address => uint256) ownerItemCount;
    mapping(address => Bid) bids;

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    event MarketItemSold(
        uint256 indexed tokenId,
        address seller,
        address owner,
        bool sold
    );

    function onERC721Received(
        address _operator,
        address _from,
        uint256 _tokenId,
        bytes calldata _data
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    function setListingPrice(uint256 _price) public{
        require(msg.sender == marketOwner, "Only owner can update listing price");
        listingPrice = _price;
    }

    function getListingPrice() view public returns(uint256){
        return listingPrice;
    }

    function setMarketItemPrice(uint256 tokenId, uint256 price) public{
        MarketItem storage item = idToMarketItem[tokenId];
        require(item.owner == msg.sender);
        item.price = price;
    }

    function _setBaseURI(string memory baseURI_) external onlyOwner(){
        _baseURIextended = baseURI_;
    }

     function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    /*function tokenURI(uint256 tokenId) public view virtual override(ERC721URIStorage) returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, Strings.toString(tokenId))) : "";
    }*/

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();
        
        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(base, Strings.toString(tokenId)));
    }

    /*function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual override(ERC721URIStorage){
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }*/

    function _mintSingleNFT() private{
        _tokenIdTracker.increment();
        uint currentMinted = _tokenIdTracker.current();
        _safeMint(msg.sender, currentMinted);
        setApprovalForAll(marketOwner, true);
        createMarketItem(currentMinted);
    }

    function createCollection(uint _count) public payable{
        uint totalMinted = _tokenIdTracker.current();
        for(uint i=0; i<_count;i++){
            _mintSingleNFT();
        }
    }

    function create(string memory tokenURI) public returns(uint256) {
        //require(hasRole(MINTER_ROLE, _msgSender()), "Mint: must have minter role to mint");
        //require(owner == msg.sender);
        
        _tokenIdTracker.increment();
        uint256 nftTokenId = _tokenIdTracker.current();

        _safeMint(msg.sender, nftTokenId);
        //_setTokenURI(nftTokenId, tokenURI);

        setApprovalForAll(marketOwner, true);

        createMarketItem(nftTokenId);

        _getNftOwnerId[nftTokenId] = msg.sender;

        _tokenURIs[nftTokenId] = tokenURI;

        _getNftId[msg.sender] = nftTokenId;

        return nftTokenId;
    }

    function getTokenUri(uint256 tokenId) public view returns(string memory){
        return _tokenURIs[tokenId];
    }

    function getTokenId(address addr) public view returns(uint256){
        return _getNftId[addr];
    }

    function createMarketItem(uint256 tokenId) private {
        //require(msg.value == listingPrice);
        
        //require(price > 0, "Price must match");
        uint256 price = 100000000;

        //_tokenId.increment();
        //uint256 _id = _tokenId.current();
        //tokenIds[_id] = tokenId;
        //itemToOwner[_id] = msg.sender;
        //ownerItemCount[msg.sender]++;
        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            price,
            payable(msg.sender),
            payable(address(this)),
            false
        );

        _transfer(msg.sender, address(this), tokenId);

        itemsInMarket.push(MarketItem(
            tokenId,
            price,
            payable(msg.sender),
            payable(address(this)),
            false
        ));

        //IERC721(nftContract).setApprovalForAll(address(this), true);
        //IERC721(nftContract).approve(address(this), tokenId);
        //IERC721(nftContract).safeTransferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    function sellToken(uint256 tokenId, uint256 price) public payable{
        require(idToMarketItem[tokenId].seller == msg.sender, "Only owners can do this");
        require(msg.value == listingPrice, "Price must equal listing");
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        uint256 sumval = _itemsSold.current();
        if(sumval == 0){
            return;
        } else{
            _itemsSold.decrement();
        }
        _setApprovalForAll(idToMarketItem[tokenId].owner, marketOwner, true);
        setApprovalForAll(marketOwner, true);
        _transfer(msg.sender, address(this), tokenId);
    }

    function sellItemAndTransferOwnership(uint256 tokenId) public payable nonReentrant{
        uint256 price = idToMarketItem[tokenId].price;
        address seller = idToMarketItem[tokenId].seller;
        price = price*10**18;
        require(msg.value == price, "Submit Asking Price");

        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        
        _itemsSold.increment();

        _setApprovalForAll(idToMarketItem[tokenId].owner, marketOwner, true);
        setApprovalForAll(marketOwner, true);
        _transfer(address(this), msg.sender, tokenId);
        payable(marketOwner).transfer(listingPrice);
        payable(seller).transfer(msg.value);

        emit MarketItemSold(
            tokenId,
            seller,
            msg.sender,
            true
        );
    }

    function returnMarketItem(uint256 tokenId) public view returns(MarketItem memory) {
        MarketItem memory item = idToMarketItem[tokenId];
        return item;
    }

    function getUnsoldItems() public view returns(MarketItem[] memory){
        uint itemCount = _tokenIdTracker.current();
        uint unsoldItems = _tokenIdTracker.current() - _itemsSold.current();
        uint itemIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItems);
        for(uint i=0; i<itemCount; i++){
            if(idToMarketItem[i + 1].sold == false){
                uint currentId = i + 1;
                MarketItem memory currentItem = idToMarketItem[currentId];
                items[itemIndex] = currentItem; 
                itemIndex+=1;
            }
        }
        return items;
    }

    function getItemsByOwner() public view returns(MarketItem[] memory){
        uint totalItemCount = _tokenIdTracker.current();
        uint itemCount = 0;
        uint itemIndex = 0;

        for(uint i=0; i<totalItemCount; i++){
            if(idToMarketItem[i+1].owner == msg.sender){
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for(uint i=0; i < totalItemCount; i++){
            if(idToMarketItem[i+1].owner == msg.sender){
                uint currentId = i + 1;
                MarketItem memory currentItem = idToMarketItem[currentId];
                items[itemIndex] = currentItem;
                itemIndex += 1;
            }
        }

        return items;
    }

    function getListedItemsByOwner() public view returns(MarketItem[] memory){
        uint totalItemCount = _tokenIdTracker.current();
        uint itemCount = 0;
        uint itemIndex = 0;

        for(uint i=0; i<totalItemCount; i++){
            if(idToMarketItem[i+1].seller == msg.sender){
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for(uint i=0; i < totalItemCount; i++){
            if(idToMarketItem[i+1].seller == msg.sender){
                uint currentId = i + 1;
                MarketItem memory currentItem = idToMarketItem[currentId];
                items[itemIndex] = currentItem;
                itemIndex += 1;
            }
        }

        return items;
    }

    function getMarketItems() public view returns (MarketItem[] memory) {
      uint itemCount = _tokenIdTracker.current();
      uint unsoldItemCount = _tokenIdTracker.current() - _itemsSold.current();
      uint currentIndex = 0;

      MarketItem[] memory items = new MarketItem[](unsoldItemCount);
      for (uint i = 0; i < itemCount; i++) {
        if (idToMarketItem[i + 1].owner == address(this)) {
          uint currentId = i + 1;
          MarketItem memory currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    function getAllItems() public view returns(MarketItem[] memory){
        uint totalItems = _tokenIdTracker.current();
        //uint itemCount = 0;
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](totalItems);
        for(uint i=0; i<totalItems ; i++){
            uint currentId = i + 1;
            MarketItem memory currentItem = idToMarketItem[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }

    //Still need to implement bidding and auction functions along with event/emit for certain ones
    //Watch security for all functions: reentranncy, signature check, false accounts, control of accepted bid price

    /*function setMinimumBid(uint256 amount, uint256 tokenId) public payable {
        MarketItem memory currentItem = idToMarketItem[tokenId];
        require(currentItem.owner == msg.sender);
        minimumBid = amount;
    }*/

    /*function createBid(uint256 value, address from, uint256 tokenId) public payable validAddress(from){
        require(msg.value > listingPrice);
        require(msg.sender == from);
        require(msg.value > minimumBid);

        value = msg.value;

        MarketItem memory currentItem = idToMarketItem[tokenId];

        Bid storage newBid = bids[from];
        newBid.amount = value;
        newBid.sender = payable(from);

        //uint bidIndex = 0;
        //uint index = 0;
        //uint totalItemCount = _tokenId.current();
        if(currentItem.sold == false){
            bidIndex += 1;
        }

        newBid.bidders[bidIndex] = currentItem;
    }*/

}