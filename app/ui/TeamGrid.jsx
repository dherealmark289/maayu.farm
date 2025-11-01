"use client";

import { useState } from "react";

export default function TeamGrid({ members }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const onOpen = (m) => {
    setSelected(m);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <>
      <div className="team-main-card">
        <h2 className="team-main-title">Team</h2>
        <div className="team-grid">
          {members.map((m) => (
            <button key={m.name} type="button" className="member-card" onClick={() => onOpen(m)}>
              <div className={`member-media${m.photo ? "" : " empty"}`}>
                {m.photo ? <img alt="" src={m.photo} /> : null}
              </div>
              <div className="member-name">{m.name}</div>
              {m.role && <div className="member-role">{m.role}</div>}
            </button>
          ))}
        </div>
      </div>

      <div className={`team-modal ${open ? "open" : ""}`} onClick={onClose} aria-hidden={open ? "false" : "true"}>
        <div className="team-panel ui-sign notched-90" onClick={(e) => e.stopPropagation()}>
          {selected ? (
            <div className="team-panel-inner">
              <div className="panel-left">
                <div className={`panel-photo${selected.photo ? "" : " empty"}`}>
                  {selected.photo ? <img alt="" src={selected.photo} /> : null}
                </div>
                <div className="panel-name">{selected.name}</div>
                {selected.role ? <div className="panel-role">{selected.role}</div> : null}
                {selected.group ? <div className="panel-group">{selected.group}</div> : null}
              </div>
              <div className="panel-right">
                <div className="panel-section">
                  <div className="panel-title">Biography</div>
                  <p className="panel-text">{selected.bio || `We will add a short description here about ${selected.name}.`}</p>
                </div>
                {selected.skills && selected.skills.length > 0 && (
                  <div className="panel-section">
                    <div className="panel-title">Skills</div>
                    {selected.skills.map((skill, idx) => {
                      // Map skill names to icons (similar to VolunteerCards)
                      const getSkillIcon = (skillName) => {
                        const iconMap = {
                          'foraging': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Basket/3D/basket_3d.png',
                          'farming': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Tractor/3D/tractor_3d.png',
                          'nature': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Evergreen%20Tree/3D/evergreen_tree_3d.png',
                          'conservation': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Recycling%20Symbol/3D/recycling_symbol_3d.png',
                          'building': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Hammer%20and%20Wrench/3D/hammer_and_wrench_3d.png',
                          'build': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Hammer%20and%20Wrench/3D/hammer_and_wrench_3d.png',
                          'animal conservation': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Paw%20Prints/3D/paw_prints_3d.png',
                          'animal welfare': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Heart%20Hands/3D/heart_hands_3d.png',
                          'cooking': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Cooking/3D/cooking_3d.png',
                          'gardening': 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Seedling/3D/seedling_3d.png',
                        };
                        // Match skill name (case-insensitive, partial match)
                        const skillLower = skillName.toLowerCase();
                        for (const [key, icon] of Object.entries(iconMap)) {
                          if (skillLower.includes(key) || key.includes(skillLower)) {
                            return icon;
                          }
                        }
                        // Default icon if no match
                        return 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Light%20Bulb/3D/light_bulb_3d.png';
                      };

                      const skillIcon = getSkillIcon(skill.name);
                      const skillLevel = skill.level || 0; // Get level from database (1-10)

                      return (
                        <div className="skill-row" key={idx}>
                          {skillIcon ? <img className="skill-icon" alt="" src={skillIcon} /> : null}
                          <span className="skill-name">{skill.name}</span>
                          <div className="skill-bars">
                            {Array.from({ length: skillLevel }).map((_, j) => (
                              <span key={j} className="bar filled" />
                            ))}
                          </div>
                          <span className="skill-score">{skillLevel}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <button type="button" className="panel-close" onClick={onClose}>×</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}


