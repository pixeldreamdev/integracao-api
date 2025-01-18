import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { images } from '../data/imageData';
import Image from 'next/image';
import './swiper-bundle.min.css';

const SwiperComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-50px',
      }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <section
      id="services"
      className="min-h-screen w-full relative bg-gray-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-white via-transparent to-black"></div>
      </div>

      <div ref={contentRef} className="container mx-auto px-4 relative z-10 py-8 md:py-16">
        <div className="text-center space-y-4">
          <h2
            className={`text-[2.95rem] text-center md:text-6xl font-black leading-tight mt-[1rem]
              transition-all duration-700 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}
              bg-gradient-to-r from-green-500 to-black bg-clip-text text-transparent
              tracking-tight font-sans py-4`}
          >
            Nossos Serviços
          </h2>
          <p
            className={`text-gray-600 max-w-2xl mx-auto text-lg md:text-xl
              transition-all duration-700 delay-100 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
          >
            Soluções financeiras personalizadas para atender suas necessidades, com as melhores
            taxas e condições do mercado.
          </p>
        </div>

        <div
          className={`swiper-container h-[50vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]
            transition-all duration-1000 delay-300 ease-out
            ${isVisible ? 'opacity-100 translate-y-[5px]' : 'opacity-0 translate-y-20'}`}
        >
          <Swiper
            modules={[Navigation]}
            slidesPerView={1.5}
            spaceBetween={10}
            centeredSlides={true}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              360: {
                slidesPerView: 1.8,
                spaceBetween: 15,
              },
              480: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
            className="swiper h-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="swiper-slide relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 rounded-lg text-green-500">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold mb-0.5 sm:mb-1">
                    {image.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-sm line-clamp-2 sm:line-clamp-none text-white">
                    {image.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}

            <div className="swiper-button swiper-button-next"></div>
            <div className="swiper-button swiper-button-prev"></div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default SwiperComponent;
