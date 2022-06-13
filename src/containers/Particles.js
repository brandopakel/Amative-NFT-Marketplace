import { tsParticles } from "tsparticles-engine";

const Particles = tsParticles.load('App-body', {
    background: {
        color: {
          value: "#222222",
        },
      },
      fullScreen:{
          enable: false
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: "repulse",
          },
          onHover: {
            enable: false,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: 'random',
        },
        links: {
          color: 'random',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 3,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
          stroke: {
            width: 4,
            color: "#000000",
          }
        },
        size: {
          value: 0,
        },
      },
      detectRetina: true,
});

export default Particles;