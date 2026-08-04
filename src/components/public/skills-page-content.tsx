import type { SkillCategory } from "@/types/portfolio";



interface SkillsPageContentProps {

  categories: SkillCategory[];

}







export function SkillsPageContent({
  categories,
}: SkillsPageContentProps) {



  if (!categories.length) {

    return null;

  }





  const totalSkills =
    categories.reduce(
      (total, category) =>
        total + category.skills.length,
      0
    );







  return (

    <div
      className="
      bg-background
      "
    >







      {/* HERO */}


      <section

        className="
        max-w-screen-2xl
        mx-auto
        px-8
        pt-32
        pb-20
        lg:px-16
        "

      >





        <p

          className="
          text-sm
          uppercase
          tracking-[0.4em]
          text-primary
          "

        >

          Technical Arsenal

        </p>









        <h1

          className="
          mt-8
          max-w-6xl
          text-5xl
          font-semibold
          tracking-tight
          leading-[1.05]
          lg:text-7xl
          "

        >

          Technologies,

          <br />

          concepts and tools

          <span
            className="
            text-primary
            "
          >

            {" "}behind my work.

          </span>


        </h1>








        <p

          className="
          mt-10
          max-w-3xl
          text-xl
          leading-9
          text-muted-foreground
          "

        >

          A curated collection of programming
          languages, frameworks, security tools
          and concepts that I use to design,
          build and analyze systems.

        </p>









        {/* STATS */}


        <div

          className="
          mt-16
          grid
          gap-6
          sm:grid-cols-3
          "

        >






          <StatCard

            value={`${totalSkills}+`}

            label="Technologies"

          />





          <StatCard

            value={`${categories.length}`}

            label="Technical Domains"

          />





          <StatCard

            value="3+"

            label="Years Coding"

          />





        </div>





      </section>









      <div

        className="
        mx-8
        h-px
        bg-border
        lg:mx-16
        "

      />









      {/* SKILLS */}



      <section

        className="
        max-w-screen-2xl
        mx-auto
        px-8
        py-32
        lg:px-16
        "

      >







        <div

          className="
          grid
          gap-8
          lg:grid-cols-2
          "

        >






          {
            categories.map(
              (
                category,
                index
              ) => (



                <article

                  key={category.id}

                  className="
                  group
                  rounded-3xl
                  border
                  bg-card
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                  "

                >







                  <div

                    className="
                    flex
                    items-center
                    justify-between
                    "

                  >



                    <span

                      className="
                      text-sm
                      tracking-[0.35em]
                      text-muted-foreground
                      "

                    >

                      {String(index + 1).padStart(2,"0")}

                    </span>






                    <span

                      className="
                      h-3
                      w-3
                      rounded-full
                      bg-primary
                      transition
                      group-hover:scale-150
                      "

                    />



                  </div>









                  <h2

                    className="
                    mt-8
                    text-3xl
                    font-semibold
                    tracking-tight
                    "

                  >

                    {category.name}

                  </h2>










                  {
                    category.description && (

                      <p

                        className="
                        mt-4
                        leading-7
                        text-muted-foreground
                        "

                      >

                        {category.description}

                      </p>

                    )
                  }









                  <div

                    className="
                    mt-8
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-2
                    "

                  >






                    {
                      category.skills.map(

                        (skill) => (



                          <div

                            key={skill.id}

                            className="
                            flex
                            items-center
                            justify-between
                            rounded-xl
                            border
                            px-4
                            py-3
                            transition
                            hover:bg-muted/40
                            last:odd:sm:col-span-2
                            "

                          >







                            <div

                              className="
                              flex
                              items-center
                              gap-3
                              "

                            >




                              {
                                skill.icon && (

                                  <span
                                    className="
                                    text-lg
                                    "
                                  >

                                    {skill.icon}

                                  </span>

                                )
                              }







                              <span

                                className="
                                font-medium
                                "

                              >

                                {skill.name}

                              </span>





                            </div>










                            <div

                              className="
                              flex
                              items-center
                              gap-3
                              "

                            >






                              {
                                skill.featured && (

                                  <span

                                    className="
                                    rounded-full
                                    bg-primary/10
                                    px-2
                                    py-1
                                    text-[10px]
                                    uppercase
                                    tracking-wider
                                    text-primary
                                    "

                                  >

                                    Featured

                                  </span>

                                )
                              }








                              <span

                                className="
                                text-xs
                                uppercase
                                tracking-wider
                                text-muted-foreground
                                "

                              >

                                {skill.level}

                              </span>




                            </div>






                          </div>



                        )

                      )

                    }






                  </div>









                </article>



              )
            )
          }





        </div>






      </section>







    </div>

  );

}












function StatCard({

  value,

  label,

}: {

  value:string;

  label:string;

}) {


  return (

    <div

      className="
      rounded-2xl
      border
      bg-card
      p-6
      "

    >


      <p

        className="
        text-4xl
        font-semibold
        "

      >

        {value}

      </p>




      <p

        className="
        mt-2
        text-sm
        text-muted-foreground
        "

      >

        {label}

      </p>



    </div>

  );

}
