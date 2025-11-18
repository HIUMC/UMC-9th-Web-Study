const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)]">
      <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full" />
    </div>
  );
};

export default LoadingSpinner;