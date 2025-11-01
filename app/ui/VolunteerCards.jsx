"use client";

const slides = [
  {
    id: 1,
    title: "Build the home of your dreams",
    body:
      "Forget blueprints. Forget concrete. Discover how simple — and human — it is to build with your hands. Work with mud, bamboo, and natural materials to shape spaces that breathe. Unlearn what the system taught you — and rediscover what it means to build the home of your dreams",
    labels: ["Mud house building", "Mosaic design", "Wood Painting"],
    image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 2,
    title: "Practical farming to grow your own food",
    body:
      "You’ll learn with us how to read the land — to understand soil, seasons, and planting cycles. Together, we’ll explore how to grow food that works with nature, not against it. Rebuild a thriving ecosystem, and create a small forest for foraging throughout the year.",
    labels: ["Permaculture design", "Regenerative farming", "Foraging"],
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 3,
    title: "Coexist in harmony with animals",
    body:
      "Learn to care for life beyond your own. Build a tortoise sanctuary, care for our lovely dogs and cats, and help us revive an old pond to attract butterflies and birds. Coexisting — not controlling — animals is how we.",
    labels: ["Animal Care & Training", "Tortoise Sanctuary Build", "Butterflies & Bees"],
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60",
  },
];

export default function VolunteerCards() {
  return (
    <>
      <div className="vol-grid">
        {slides.map((s) => {
          // Build per-card skills
          const skills =
            s.id === 1
              ? [
                  { name: "Build", value: 10, icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Hammer%20and%20Wrench/3D/hammer_and_wrench_3d.png" },
                ]
              : s.id === 2
              ? [
                  { name: "Farming", value: 8, icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Tractor/3D/tractor_3d.png" },
                  { name: "Nature", value: 7, icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Evergreen%20Tree/3D/evergreen_tree_3d.png" },
                  { name: "Conservation", value: 8, icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Recycling%20Symbol/3D/recycling_symbol_3d.png" },
                  { name: "Foraging", value: 9, icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Basket/3D/basket_3d.png" },
                ]
              : [
                  { name: "Animal conservation", value: 5, icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Paw%20Prints/3D/paw_prints_3d.png" },
                  { name: "Animal welfare", value: 6, icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Heart%20Hands/3D/heart_hands_3d.png" },
                  { name: "Understanding", value: 8, icon: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Light%20Bulb/3D/light_bulb_3d.png" },
                ];

          // Label icons per slide
          const labelIcon = (label) => {
            if (s.id === 1) {
              return {
                "Mud house building": "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Brick/3D/brick_3d.png",
                "Mosaic design": "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Artist%20Palette/3D/artist_palette_3d.png",
                "Wood Painting": "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Paintbrush/3D/paintbrush_3d.png",
              }[label];
            }
            if (s.id === 2) {
              return {
                "Permaculture design": "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Herb/3D/herb_3d.png",
                "Regenerative farming": "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Seedling/3D/seedling_3d.png",
                Foraging: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Basket/3D/basket_3d.png",
              }[label];
            }
            return {
              "Animal Care & Training": "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Paw%20Prints/3D/paw_prints_3d.png",
              "Tortoise Sanctuary Build": "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Turtle/3D/turtle_3d.png",
              "Butterflies & Bees": "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Butterfly/3D/butterfly_3d.png",
            }[label];
          };

          return (
            <div key={s.id} className="vol-card ui-sign notched-90">
              {s.image ? (
                <div className="vol-thumb">
                  <img alt="" src={s.image} />
                </div>
              ) : null}
              <div className="vol-title">{s.title}</div>
              <div className="vol-body">{s.body}</div>

              <div className="panel-section">
                <div className="panel-title">Skills</div>
                {skills.map((sk, i) => (
                  <div className="skill-row" key={i}>
                    {sk.icon ? <img className="skill-icon" alt="" src={sk.icon} /> : null}
                    <span className="skill-name">{sk.name}</span>
                    <div className="skill-bars">
                      {Array.from({ length: sk.value }).map((_, j) => (
                        <span key={j} className="bar filled" />
                      ))}
                    </div>
                    <span className="skill-score">{sk.value}</span>
                  </div>
                ))}
              </div>

              <div className="panel-section">
                <div className="panel-title">Labels</div>
                <ul className="skills">
                  {s.labels.map((l, idx) => (
                    <li key={idx} className="skill-tag">
                      {labelIcon(l) ? <img className="skill-tag-icon" alt="" src={labelIcon(l)} /> : null}
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="https://www.worldpackers.com/positions/83649" target="_blank" rel="noopener noreferrer" className="vol-apply-btn">Apply Now</a>
            </div>
          );
        })}
      </div>
      
    </>
  );
}


