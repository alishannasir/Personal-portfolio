import React from "react";

interface SkillTagsProps {
  skills: string[];
}

const SkillTags: React.FC<SkillTagsProps> = ({ skills }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.75rem 1rem",
        padding: "2.5rem 0 2rem 0",
        background: "#111",
      }}
    >
      {skills.map((skill, idx) => (
        <span
          key={skill + idx}
          style={{
            display: "inline-block",
            background: "#fff",
            color: "#111",
            border: "1.5px solid #222",
            borderRadius: "999px",
            padding: "0.45em 1.2em",
            fontSize: "1rem",
            fontWeight: 500,
            letterSpacing: 0.1,
            boxShadow: "0 1px 4px #0001",
            marginBottom: "0.25rem",
            userSelect: "none",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

export default SkillTags; 