import React from 'react';
import { Carousel, CarouselContent, CarouselPrevious, CarouselNext } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer",
    "UI/UX Designer",
    "FullStack Developer"
];

function CategoryCarousel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (Query) => {
        console.log(`Category selected: ${Query}`);
        dispatch(setSearchedQuery(Query));
        navigate("/browse");
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20 ">
                <CarouselContent className=" pl-5 flex space-x-20 ">
                    {category.map((cat, index) => (
                        <React.Fragment key={index}>
                            <Button onclick={() => {
                                console.log(`Searching for jobs in category: ${cat}`);
                                searchJobHandler(cat);
                            }}
                                variant="outline"
                                className="bg-[#c31664] rounded-full shadow-2xl text-white w-full m"
                            >
                                {cat}
                            </Button>
                        </React.Fragment>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="rounded-full bg-transparent text-black  hover:bg-gray-300 hover:text-black p-2 transition duration-75 active:scale-90" />
                <CarouselNext className="rounded-full bg-transparent text-black hover:bg-gray-300 hover:text-black p-2 transition duration-75 active:scale-90" />
            </Carousel>
        </div>
    );
}

export default CategoryCarousel;
