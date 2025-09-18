import { useEffect, useRef } from "react";
import * as THREE from "three";
window.THREE = THREE;

export default function VirtualTour() {
  const viewerRef = useRef(null);
  const panoramasRef = useRef({});
  const PANOLENSRef = useRef(null);

  useEffect(() => {
    import("panolens").then((PANOLENS) => {
      PANOLENSRef.current = PANOLENS;

      // Create viewer once
      const viewer = new PANOLENS.Viewer({
        container: document.querySelector("#panorama-container"),
        autoRotate: false,
        controlBar: true,
        cameraFov: 80,
        dwellTime: 0,
        transitionDuration: 1500,
      });

      // Create panoramas
      const room1 = new PANOLENS.ImagePanorama(
        "/images/shot-panoramic-composition-bedroom.jpg"
      );
      const room2 = new PANOLENS.ImagePanorama(
        "/images/shot-panoramic-composition-living-room.jpg"
      );
      const room3 = new PANOLENS.ImagePanorama(
        "/images/shot-panoramic-composition-living.jpg"
      );

      panoramasRef.current = { room1, room2, room3 };

      // --- Hotspots ---
      const hotspot1 = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info);
      hotspot1.position.set(3000, -500, -2000);
      hotspot1.addHoverText("Go to Room 2");
      hotspot1.addEventListener("click", () => {
        hotspot1.dispatchEvent({ type: "hoverleave" });
        room2.load();
        viewer.setPanorama(room2);
      });
      room1.add(hotspot1);

      const hotspot2 = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info);
      hotspot2.position.set(-3000, -500, 2000);
      hotspot2.addHoverText("Go to Room 3");
      hotspot2.addEventListener("click", () => {
        hotspot2.dispatchEvent({ type: "hoverleave" });
        room3.load();
        viewer.setPanorama(room3);
      });
      room2.add(hotspot2);

      const hotspot3 = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info);
      hotspot3.position.set(0, -500, -3000);
      hotspot3.addHoverText("Back to Room 1");
      hotspot3.addEventListener("click", () => {
        hotspot3.dispatchEvent({ type: "hoverleave" });
        room1.load();
        viewer.setPanorama(room1);
      });
      room3.add(hotspot3);

      // Add panoramas to viewer
      viewer.add(room1, room2, room3);

      // Always preload and show Room 1 first
      room1.load();
      viewer.setPanorama(room1);

      viewerRef.current = viewer;
    });
  }, []);

  return (
    <div
      id="panorama-container"
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    />
  );
}
