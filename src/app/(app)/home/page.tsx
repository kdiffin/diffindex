import React from "react";

function page() {
  return (
    <div className="container py-12 text-center">
      <h1 className="mt- text-4xl font-extrabold">Landing page WIP</h1>
      <p className="  ml-1 mt-2  italic text-muted-foreground">
        {" "}
        For now here are some videos I enjoy about competitive pokemon
      </p>

      <ul className="mt-14 flex w-full  list-none flex-col items-center justify-center gap-16 text-left ">
        <li>
          <h2 className="mt- text-2xl font-extrabold">
            How good was Rayquaza actually?
          </h2>
          <p className=" mt-1   italic text-muted-foreground">
            {" "}
            This video discusses the VGC and singles viability of Rayquaza
            throughout 7 generations.
          </p>

          <div className="mt-4 grid w-full justify-center ">
            <iframe
              width="1000"
              height="562"
              className="max-w-full"
              src="https://www.youtube.com/embed/z6eLt8X-Ndo"
              title="How GOOD was Rayquaza ACTUALLY? - History of Rayquaza in Competitive Pokemon (Gens 3-7)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </li>

        <li>
          <h2 className="mt- text-2xl font-extrabold">
            This Is Why YANMEGA Is A PROBLEM!
          </h2>
          <p className=" mt-1   italic text-muted-foreground">
            {" "}
            This video sheds some light upon the competitive viability of a cool
            bug type pokemon Yanmega.
          </p>

          <div className="mt-4 grid w-full justify-center ">
            <iframe
              className="max-w-full"
              width="1000"
              height="562"
              src="https://www.youtube.com/embed/SOq7G-H6yBU"
              title="This Is Why YANMEGA Is A PROBLEM!"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default page;
