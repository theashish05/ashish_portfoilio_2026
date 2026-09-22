import { Suspense, lazy } from "react";
import { useDeviceCapability } from "../hooks/useDeviceCapability";

const NatureBackdrop = lazy(() => import("../scenes/NatureBackdrop"));

// Fixed, page-wide forest: drifting fireflies + falling leaves. The camera
// dollies forward as you scroll down and back as you scroll up.
export default function NatureBackground() {
  const { canRender3D, isMobile } = useDeviceCapability();
  return (
    <div aria-hidden className="nature-bg fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_8%,rgba(74,222,128,0.13),transparent_55%),radial-gradient(ellipse_at_88%_78%,rgba(45,212,191,0.10),transparent_55%),radial-gradient(ellipse_at_50%_110%,rgba(230,242,106,0.07),transparent_50%)]" />
      {canRender3D && (
        <Suspense fallback={null}>
          <NatureBackdrop mobile={isMobile} />
        </Suspense>
      )}
    </div>
  );
}
