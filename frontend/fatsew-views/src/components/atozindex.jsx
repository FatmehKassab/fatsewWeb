import React from "react";

const AtoZIndex = ({ data }) => {
  // Group entries by starting letter
  const grouped = data.reduce((acc, item) => {
    const letter = item.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(item);
    return acc;
  }, {});

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="flex items-center justify-center w-[80%]">


    
      <main className="w-3/4 p-6">
        <h1 className="text-2xl font-bold text-primary mb-2">A-Z Index</h1>
        <p className="text-gray-700 mb-4 text-sm">
          Searching for specific information? This alphabetical listing provides a comprehensive
          overview of services, departments, and academic programs to assist you in your quest.
        </p>

        {/* Alphabet Navigation */}
        <div className="flex flex-wrap gap-2 text-sm mb-6">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#${letter}`}
              className={`hover:underline ${
                grouped[letter] ? "text-primary" : "text-gray-400 cursor-default"
              }`}
              onClick={(e) => !grouped[letter] && e.preventDefault()}
            >
              {letter}
            </a>
          ))}
        </div>

        {/* List Content */}
        {letters.map(
          (letter) =>
            grouped[letter] && (
              <section key={letter} id={letter} className="mb-8">
                <h2 className="text-xl font-bold text-black mb-2">{letter}</h2>
                <ul className="ml-4 list- text-primary">
                  {grouped[letter].map((item) => (
                    <li key={item.name}>
                      <a href={item.link} className="text-primary hover:underline">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )
        )}
      </main>
    </div>
  );
};

export default AtoZIndex;
