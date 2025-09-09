
import React, { useRef, useEffect, useState } from 'react';
import { ContextManager, initialContext } from './ContextManager';

function ShowTreePage() {
  const manager = new ContextManager(initialContext);
  const people = manager.read();
  // Find all unique families (spouse pairs with children)
  const families = [];
  const used = new Set();
  people.forEach(person => {
    if (person.spouse && !used.has(person.id) && !used.has(person.spouse)) {
      // Find children for this couple
      const spouse = people.find(p => p.id === person.spouse);
      const children = people.filter(
        child => (child.father === person.id && child.mother === person.spouse) ||
                 (child.mother === person.id && child.father === person.spouse)
      );
      families.push({
        parents: [person, spouse],
        children
      });
      used.add(person.id);
      used.add(person.spouse);
      children.forEach(child => used.add(child.id));
    }
  });
  // Add singles (not in a family)
  people.forEach(person => {
    if (!used.has(person.id)) {
      families.push({ parents: [person], children: [] });
      used.add(person.id);
    }
  });

  // Card refs for arrows
  const cardRefs = useRef({});
  const [arrows, setArrows] = useState([]);
  useEffect(() => {
    const newArrows = [];
    families.forEach(fam => {
      // Draw spouse line
      if (fam.parents.length === 2) {
        const [p1, p2] = fam.parents;
        const ref1 = cardRefs.current[p1.id];
        const ref2 = cardRefs.current[p2.id];
        if (ref1 && ref2) {
          const r1 = ref1.getBoundingClientRect();
          const r2 = ref2.getBoundingClientRect();
          newArrows.push({
            from: { x: r1.right, y: r1.top + r1.height / 2 },
            to: { x: r2.left, y: r2.top + r2.height / 2 },
            type: 'spouse',
          });
        }
      }
      // Draw parent-to-child lines
      fam.parents.forEach(parent => {
        const parentRef = cardRefs.current[parent.id];
        if (!parentRef) return;
        const parentRect = parentRef.getBoundingClientRect();
        fam.children.forEach(child => {
          const childRef = cardRefs.current[child.id];
          if (!childRef) return;
          const childRect = childRef.getBoundingClientRect();
          newArrows.push({
            from: { x: parentRect.left + parentRect.width / 2, y: parentRect.bottom },
            to: { x: childRect.left + childRect.width / 2, y: childRect.top },
            type: 'child',
          });
        });
      });
    });
    setArrows(newArrows);
  }, [families]);

  // Get container position for SVG overlay
  const containerRef = useRef();
  const [containerRect, setContainerRect] = useState(null);
  useEffect(() => {
    if (containerRef.current) {
      setContainerRect(containerRef.current.getBoundingClientRect());
    }
  }, [families]);

  // Helper to get full name by id
  const getNameById = (id) => {
    if (!id) return 'N/A';
    const p = people.find(p => p.id === id);
    return p ? `${p.firstname} ${p.lastname}` : 'N/A';
  };

  return (
    <div className="container mt-5" style={{ position: 'relative' }} ref={containerRef}>
      <h2 className="mb-4">Family Tree</h2>
      {/* SVG overlay for arrows */}
      {containerRect && (
        <svg style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: containerRect.height, zIndex: 2 }}>
          {arrows.map((arrow, idx) => (
            <line
              key={idx}
              x1={arrow.from.x - containerRect.left}
              y1={arrow.from.y - containerRect.top}
              x2={arrow.to.x - containerRect.left}
              y2={arrow.to.y - containerRect.top}
              stroke={arrow.type === 'spouse' ? 'blue' : 'green'}
              strokeWidth={2}
              markerEnd={arrow.type === 'spouse' ? undefined : 'url(#arrowhead)'}
            />
          ))}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="black" />
            </marker>
          </defs>
        </svg>
      )}
      {/* Render families: parents on one row, children below */}
      <div className="d-flex flex-column align-items-center">
        {families.length === 0 && <div>No people found.</div>}
        {families.map((fam, i) => (
          <div key={i} className="mb-5 w-100">
            <div className="d-flex justify-content-center mb-3 gap-3">
              {fam.parents.map(parent => (
                <div
                  key={parent.id}
                  className="card h-100 shadow-sm"
                  ref={el => (cardRefs.current[parent.id] = el)}
                  style={{ width: 200, position: 'relative', zIndex: 3 }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{parent.firstname} {parent.lastname}</h5>
                    <p className="card-text mb-1"><strong>Birthdate:</strong> {parent.birthdate || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
            {fam.children.length > 0 && (
              <div className="d-flex justify-content-center gap-3" style={{ marginTop: '4rem' }}>
                {fam.children.map(child => (
                  <div
                    key={child.id}
                    className="card h-100 shadow-sm"
                    ref={el => (cardRefs.current[child.id] = el)}
                    style={{ width: 200, position: 'relative', zIndex: 3 }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{child.firstname} {child.lastname}</h5>
                      <p className="card-text mb-1"><strong>Birthdate:</strong> {child.birthdate || 'N/A'}</p>
                      <p className="card-text mb-1"><strong>Father:</strong> {getNameById(child.father)}</p>
                      <p className="card-text mb-1"><strong>Mother:</strong> {getNameById(child.mother)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowTreePage;

