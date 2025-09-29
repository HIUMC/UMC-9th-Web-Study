import { ClipLoader } from "react-spinners";

export function LoadingSpinner() {
  return <ClipLoader  className="size-12 animate-spin rounded-full border-6 border-t-transparent" >
    <span className="sr-only">로딩 중 ...</span>
  </ClipLoader>;
}

// return <div className="size-12 animate-spin rounded-full border-6 border-t-transparent" role="status">
//     <span className="sr-only">로딩 중 ...</span>
//   </div>