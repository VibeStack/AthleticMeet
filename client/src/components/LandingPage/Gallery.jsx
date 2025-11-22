import React from 'react';

const Gallery = ({ darkMode }) => {
    const galleryImages = [
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1426927308491-6380b6a9936f?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop'
    ];

    return (
        <section id="gallery" className={`py-16 sm:py-20 md:py-24 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <span className="inline-block px-4 py-2 bg-pink-500/10 rounded-full text-pink-500 font-semibold text-sm mb-4">
                        Memories
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-linear-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                        Gallery
                    </h2>
                    <p className={`text-lg sm:text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
                        Moments of glory and determination
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {galleryImages.map((img, idx) => (
                        <div
                            key={idx}
                            className={`relative overflow-hidden rounded-2xl group cursor-pointer ${idx === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                                } ${idx === 4 ? 'lg:col-span-2' : ''} h-64 sm:h-80 ${idx === 0 ? 'sm:h-full' : ''}`}
                        >
                            <img
                                src={img}
                                alt={`Gallery ${idx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-start justify-end p-6">
                                <p className="text-white font-bold text-lg sm:text-xl mb-1">Athletic Meet 2024</p>
                                <p className="text-gray-300 text-sm">Captured moments of excellence</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="group relative px-8 py-4 bg-linear-to-r from-pink-500 to-orange-500 text-white rounded-full font-bold text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                        <span className="relative z-10">View Full Gallery</span>
                        <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
