import React from "react";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Background = () => {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await container.play();
    }, []);

    return (
        <Particles
            className="background"
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                name: "Snow",
                particles: {
                    number: {
                        value: 400,
                        density: {
                            enable: true,
                        },
                    },
                    color: {
                        value: "#242424",
                    },
                    shape: {
                        type: "circle",
                    },
                    opacity: {
                        value: 0.6,
                    },
                    size: {
                        value: 10,
                    },
                    move: {
                        enable: true,
                        speed: 5,
                        direction: "bottom",
                        straight: false,
                    },
                    wobble: {
                        enable: true,
                        distance: 10,
                        speed: 10,
                    },
                    zIndex: {
                        value: {
                            min: 0,
                            max: 100,
                        },
                        opacityRate: 10,
                        sizeRate: 10,
                        velocityRate: 10,
                    },
                },
            }}
        />
    );
};

export default Background