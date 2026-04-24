import { useState } from 'react';
import { menuData } from '../data/menuData';
import MenuItem from '../components/MenuItem';

const categories = [
  { id: 'coldPress', label: 'Cold Press Juices' },
  { id: 'fruitJuices', label: 'Fruit Juices' },
  { id: 'fruitMilkshake', label: 'Fruit Milkshakes' },
  { id: 'dryFruitsMilkshake', label: 'Dry Fruit Milkshakes' },
  { id: 'boxes', label: 'Subscription Boxes' },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('coldPress');

  return (
    <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
      <section className="mb-12 text-center md:text-left">
        <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary via-secondary to-tertiary mb-4">
          The Living Menu.
        </h1>
        <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed mx-auto md:mx-0">
          Cold-pressed, nutrient-dense elixirs crafted for the bold. Experience the humid vitality of the Living Greenhouse.
        </p>
      </section>

      <nav className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-8 py-3 rounded-xl font-bold whitespace-nowrap transition-all duration-300 ${activeCategory === cat.id
                ? 'bg-primary text-surface-dim shadow-[0_0_20px_rgba(205,255,96,0.3)]'
                : 'glass-card text-on-surface-variant hover:text-primary hover:border-primary/30'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {menuData[activeCategory].map((item, index) => {
          // Dynamic image assignment for demo purposes
          const imgIndex = index % 5;
          const images = [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ1Dx2nioun9Tc4ZDYA2Aqp78PpWF7W2IcnUJo69hJU03sjg7SL4d3VXAeuNOOAuefU7nH5uRJrzzR86x9gxg1_x8snnXwxHiUEyLVJEMkcK1eTs7Lsi9tyi3KtYPOvQmmCDhkSMJEHoEMHutSfv0nZkMBpyaE2Rx6cekYri6StFaxxfmvjqyQ5BfUw94pFFoFUL0NPqHoihK1bZGTimUSUCQZq76yPTGp0nZi_foWYMkQ12jbEfYfe6wqWt-kUuLCt8dy3UzECoQ",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCurBPrsAmP_eV18JcH3qh-GLaR3VyHWCbp3eL9PGwQqntmiZnq2xYXASpo1XUqTyX2jw96a7U9cr9cVLmD5ukc_EApsydhU3Fgik-LVDVKAvN4SSgFHwnmysIdP1vLqYi5r0uQxYWJuRi3jrvekq9mRw6pSOj9lBV50nSHJMLa2z3pgLZZSG-oPrfIueoMyCMw6RMsPsYmPRLsf8zv57AwM9EhagAJEIRRhNnFL1ZcYdNeKVsujX1gWk-L3lTkPx37ODLrRiyLHUU",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAobpnH3b6PUXz5mWsM34R9bGZJQVDT3nu5NpoInZTu6iQZmIA4RcVeJJA6Vi88CZnnzSBOlHh_0fU3zzmENZACOcY6owwbXDtmeHEPnt_hI0c2GWD6h43yXNVM8UmoTn5oZ06Y9YJZ0ZY_eSygnS7mJEfodLh3O3wlRACV6uaEZvjlQA6zJHcvAqsmyWppPPIdite0WnHD3VwQjrV4TJhJ1M9HfB-rOw5ComzftzLGxwba-fhnfHjw_JHieCknJtQWgywJaGxKBic",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuANoiNKa7FeJmkznUJ1qTSO7YUFG8kbqrQ3mmRunqsimViAflcTJ_SfW4Sp4uzr_u2qSNMFof9oudKLhltbcBLQOKO03GigD_ae2yDk_FtLbVXTtsJ62pQyi_vjNduCjcTui1kE-5Y1qnIeDRpGDVSbe31NIHbDwfQzvAIKmUvaiVVtTe0JTaHR0OAZm1D2Kk6NlRRgb-PGt52GDm1IgI_3NXVjzLxGMIlk2uYvkO8hRlj24P15QM1ugX8kpvTd1rIDUMexIRm_lwA",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDdEFsfCguvGZzksPyFWzlB4vk6kAWe69DCyIUfXF29yNN83-UC23834QrXaKFzAZf-CQkbKH6oUYNUByGDHS2-kLi6Ts3gaiMsiZWoLPXrjrHyiMHV22mq8rgfL2-LRk4zhR1WVndRXUXQC1JKRkZDhXTBK9zWd4FPNUk85K-Q6JHzeIj4E7LyhLe2MrzZsZUhpsz2pRqIwzssoZaKCyLcPhqnowDbhOyMrm_m--Sjtau3ImB7hLDcS2UnqrfJr1TtVAxcGQfGtZ8"
          ];

          return (
            <MenuItem key={item.id} item={item} imageSrc={images[imgIndex]} />
          );
        })}
      </div>
    </main>
  );
}
