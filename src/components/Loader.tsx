
interface LoaderProps {
  isLoading: boolean
}

const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center h-screen">
      {isLoading ? (
        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" />
      ) : (
        <div className="text-red-500">Error loading cats data</div>
      )}
    </div>
  );
}

export default Loader;
