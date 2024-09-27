import React from 'react'
import { Skeleton } from '../ui/skeleton'

const SkeletonVenue = () => {
  return (
    <>
      <div
        className="flex flex-col items-stretch w-[90%] max-lg:w-full max-lg:items-center max-md:ml-0"
      >
        <div className="w-fit justify-center items-center relative flex  flex-col max-md:mt-10 rounded-t-3xl hover:rounded-t-3xl  overflow-hidden ">
          <div className="overflow-hidden">
           
            <Skeleton className="aspect-square   scale-100 transition-all duration-200 ease-in-out hover:scale-110 transform-origin-center" />
          </div>
          <div className="bg-white flex w-full flex-col justify-center items-stretch px-8 py-8 rounded-none border-[1.33px] border-solid border-zinc-500 max-md:px-5  rounded-b-3xl border-t-0">
            <div className="justify-between items-stretch flex gap-5">
              <div className="items-stretch flex flex-col">
                <div className="text-slate-800 text-2xl font-semibold whitespace-nowrap">
                    <Skeleton className="w-40 h-6" />
                </div>
                <div className="items-stretch flex gap-1 mt-8 pr-2.5">
                    <div className="flex items-center justify-center rounded-full bg-emerald-200 w-10 h-10">
                        <Skeleton className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-center rounded-full bg-emerald-200 w-10 h-10">
                        <Skeleton className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-center rounded-full bg-emerald-200 w-10 h-10">
                        <Skeleton className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-center rounded-full bg-emerald-200 w-10 h-10">
                        <Skeleton className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-center rounded-full bg-emerald-200 w-10 h-10">
                        <Skeleton className="w-4 h-4" />
                    </div>
                </div>
                <div className="text-gray-900 text-base font-medium whitespace-nowrap mt-2.5">
                    <Skeleton className="w-20 h-4" />
                </div>
              </div>
              <div className="items-stretch flex flex-col mt-12 self-end max-md:mt-10">
                <div className="text-zinc-500 text-base font-medium leading-5 whitespace-nowrap">
                 <Skeleton className="w-20 h-4" />
                </div>
                <div className="text-zinc-500 text-base font-medium whitespace-nowrap justify-center items-stretch rounded bg-emerald-200 mt-2.5 px-2.5 py-1.5">
                <Skeleton className="w-20 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SkeletonVenue