import { RotatingTriangles } from "react-loader-spinner";
export default function Loader() {
  return (
    <div className="flex justify-center">
      <RotatingTriangles
        strokeColor="grey"
        strokewidth="4"
        animationDuration="0.65"
        visible={true}
        width={50}
        height={12}
      />
    </div>
  );
}
