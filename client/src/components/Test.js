import React, { useState } from 'react';

const FeatureCard = ({ title, image, isSelected, onClick }) => (
  <div
    className={`relative flex border p-4 mb-4 cursor-pointer transition duration-300 ${
      isSelected ? 'border-blue-500' : 'border-gray-300 hover:border-blue-300'
    }`}
    onClick={onClick}
  >
    <div className="rotate-270 text-slate-950 text-lg font-normal font-serif mr-2">{title}</div>
    <img className="w-16 h-16 object-cover" src={image} alt={`Feature ${title}`} />
  </div>
);

const Test = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    { title: 'Secured by 256 bit encryption', image: 'https://via.placeholder.com/83x74' },
    { title: 'Backed by ethereum based technology', image: 'https://via.placeholder.com/72x73' },
    { title: 'Verifiable transactions', image: 'https://via.placeholder.com/74x75' },
    { title: 'Easy to use', image: 'https://via.placeholder.com/72x73' },
    { title: 'Cheaper than ballot voting system', image: 'https://via.placeholder.com/73x74' },
    { title: 'Faster voting process', image: 'https://via.placeholder.com/73x74' },
  ];

  return (
    <div className="w-96 h-96 p-4 bg-white shadow-md rounded-md">
      <div className="">Features</div>
      <div className="flex flex-col">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            image={feature.image}
            isSelected={selectedFeature === index}
            onClick={() => setSelectedFeature(selectedFeature === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Test;
