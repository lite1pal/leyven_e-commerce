export default function SkeletonHorizontalProducts() {
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex items-center gap-4 ">
        <div className="skeleton h-10 w-44 bg-slate-200"></div>
      </div>
      <div className="flex w-full gap-3">
        <div className="skeleton h-96 w-96  bg-slate-200" bg-slate-200></div>
        <div className="skeleton h-96 w-96  bg-slate-200" bg-slate-200></div>
        <div className="skeleton h-96 w-96  bg-slate-200" bg-slate-200></div>
        <div className="skeleton h-96 w-96  bg-slate-200" bg-slate-200></div>
      </div>
    </div>
  );
}
