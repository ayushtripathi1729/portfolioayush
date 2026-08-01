"use client";

import Image from "next/image";


interface ProfileFlipCardProps {
  src: string;
  alt: string;
}



export function ProfileFlipCard({
  src,
  alt,
}: ProfileFlipCardProps) {


  return (

    <div
      className="
      group
      relative
      h-65
      w-65
      perspective-[1000px]
      md:h-82.5
      md:w-82.5
      "
    >


      <div
        className="
        relative
        h-full
        w-full
        rounded-full
        transition-transform
        duration-700
        transform-3d
        group-hover:rotate-y-180
        "
      >





        {/* FRONT SIDE */}


        <div
          className="
          absolute
          inset-0
          overflow-hidden
          rounded-full
          border-[3px]
          border-background
          bg-background
          shadow-[0_30px_90px_rgba(139,92,246,0.35)]
          backface-hidden
          "
        >


          <Image
            src={src}
            alt={alt}
            fill
            sizes="330px"
            draggable={false}
            className="
            pointer-events-none
            select-none
            object-cover
            "
          />


        </div>









        {/* BACK SIDE */}


        <div
          className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          rounded-full
          bg-linear-to-br
          from-violet-600
          to-purple-900
          text-white
          rotate-y-180
          backface-hidden
          "
        >


          <div
            className="
            text-center
            "
          >


            <p
              className="
              text-3xl
              font-semibold
              tracking-tight
              "
            >
              Ayush
            </p>



            <p
              className="
              mt-2
              text-xs
              uppercase
              tracking-[0.45em]
              opacity-80
              "
            >
              Tripathi
            </p>


          </div>


        </div>






      </div>


    </div>

  );

}