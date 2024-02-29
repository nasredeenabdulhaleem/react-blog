import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const EditorsPickCarousel = ({ blogs }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-4xl font-bold mb-4 text-center text-blue-600">Editor's Picks</h2>
            <Carousel 
                showArrows={true} 
                infiniteLoop={true} 
                showThumbs={false} 
                autoPlay={true} 
                interval={5000}
                className="shadow-2xl rounded-lg"
            >
                {blogs.map((blog) => (
                    <div key={blog.id} className="p-4 bg-white rounded-lg">
                        <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                        <h3 className="font-bold text-2xl mt-4 text-blue-600">{blog.title}</h3>
                        <p className="text-gray-700">{blog.snippet}</p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}; 

export default EditorsPickCarousel;