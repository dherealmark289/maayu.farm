import Image from "next/image";
export default function HomeCards() {
  const cards = [
    {
      id: 1,
      title: "Volunteer here",
      image: "/volunteer here.jpg",
      body:
        "Join our community projects in farming, hospitality and building. Learn by doing and give back.",
      href: "/volunteers",
      skills: [
        { name: "Farming", value: 8, icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Tractor/3D/tractor_3d.png" },
        { name: "Nature", value: 7, icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Evergreen%20Tree/3D/evergreen_tree_3d.png" },
        { name: "Conservation", value: 8, icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Recycling%20Symbol/3D/recycling_symbol_3d.png" },
        { name: "Foraging", value: 9, icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Basket/3D/basket_3d.png" }
      ],
      labels: [
        { text: "Permaculture design", icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Herb/3D/herb_3d.png" },
        { text: "Regenerative farming", icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Seedling/3D/seedling_3d.png" },
        { text: "Foraging", icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Basket/3D/basket_3d.png" }
      ]
    },
    {
      id: 2,
      title: "Experience here",
      image: "/experience here.jpg",
      body:
        "Workshops and day trips in natural building, crafts and local culture. Explore and create.",
      href: "/experiences",
      skills: [
        { name: "Build", value: 10, icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Hammer%20and%20Wrench/3D/hammer_and_wrench_3d.png" }
      ],
      labels: [
        { text: "Mud house building", icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Brick/3D/brick_3d.png" },
        { text: "Mosaic design", icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Artist%20Palette/3D/artist_palette_3d.png" },
        { text: "Wood Painting", icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Paintbrush/3D/paintbrush_3d.png" }
      ]
    },
    {
      id: 3,
      title: "Stay here",
      image: "/stay here.jpg",
      body:
        "Simple stays at DAO Home and partner places around Chiang Dao. Rest close to nature.",
      href: "/accommodation",
      skills: [
        { name: "Animal conservation", value: 5, icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Paw%20Prints/3D/paw_prints_3d.png" },
        { name: "Animal welfare", value: 6, icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Heart%20Hands/3D/heart_hands_3d.png" },
        { name: "Understanding", value: 8, icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Light%20Bulb/3D/light_bulb_3d.png" }
      ],
      labels: [
        { text: "Animal Care & Training", icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Paw%20Prints/3D/paw_prints_3d.png" },
        { text: "Tortoise Sanctuary Build", icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Turtle/3D/turtle_3d.png" },
        { text: "Butterflies & Bees", icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Butterfly/3D/butterfly_3d.png" }
      ]
    },
  ];

  return (
    <section className="home-section">
      <div className="home-grid">
        {cards.map((c) => (
          <a key={c.id} href={c.href || "#"} className="vol-card ui-sign notched-90" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="vol-thumb">
              <Image alt="" src={c.image} width={1200} height={800} className="w-full h-full object-cover" />
            </div>
            <div className="vol-title">{c.title}</div>
            <div className="vol-body">{c.body}</div>
          </a>
        ))}
      </div>
    </section>
  );
}


