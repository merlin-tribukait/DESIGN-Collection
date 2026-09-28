/**
 * Animation & Motion Showroom Data
 * Extracted keyframes and interaction specs from Aetheris design system
 */

const keyframesList = [
  {
    name: 'aetherisNavartBlink',
    label: 'Navart Blink / Opacity Pulse',
    category: 'Attention & Ambience',
    duration: '1.1s',
    easing: 'ease-in-out',
    iteration: 'infinite',
    css: `@keyframes aetherisNavartBlink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.25; transform: scale(0.97); }
}`,
    demoType: 'badge',
    description: 'Subtle ambient breathing effect used on hover rings, radar dots, and active card badges.'
  },
  {
    name: 'riseIn',
    label: 'Rise In / Enter Cascade',
    category: 'Entrance & Transitions',
    duration: '0.7s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    iteration: '1',
    css: `@keyframes riseIn {
  0% {
    opacity: 0;
    transform: translateY(28px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}`,
    demoType: 'card',
    description: 'Smooth physics-based deceleration entrance used for section headings and product grid reveals.'
  },
  {
    name: 'cellIn',
    label: 'Cell Stagger In',
    category: 'Entrance & Transitions',
    duration: '0.4s',
    easing: 'ease',
    iteration: '1',
    css: `@keyframes cellIn {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}`,
    demoType: 'grid',
    description: 'Micro-scale bounce used for feature matrix dots and grid data cell reveals.'
  },
  {
    name: 'blink',
    label: 'Terminal Cursor Blink',
    category: 'Terminal & CLI',
    duration: '1.1s',
    easing: 'step-end',
    iteration: 'infinite',
    css: `@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}`,
    demoType: 'cursor',
    description: 'Classic step-end blinking caret for CLI runner and interactive code terminals.'
  },
  {
    name: 'aetherisSearchIn',
    label: 'Modal Spring Pop-In',
    category: 'Overlay & Modals',
    duration: '0.22s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    iteration: '1',
    css: `@keyframes aetherisSearchIn {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}`,
    demoType: 'modal',
    description: 'Snappy spring pop-in used by the Cmd+K quick search modal and command palette.'
  },
  {
    name: 'aetherisSheetPanel',
    label: 'Drawer Slide-In',
    category: 'Overlay & Modals',
    duration: '0.24s',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    iteration: '1',
    css: `@keyframes aetherisSheetPanel {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}`,
    demoType: 'drawer',
    description: 'Slide-in drawer animation used for the mobile navigation sheet and side inspector.'
  },
  {
    name: 'pulse',
    label: 'Status Radar Pulse',
    category: 'Attention & Ambience',
    duration: '2s',
    easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
    iteration: 'infinite',
    css: `@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255, 105, 1, 0.4); }
  50% { opacity: 0.6; box-shadow: 0 0 0 10px rgba(255, 105, 1, 0); }
}`,
    demoType: 'dot',
    description: 'Telemetry heartbeat radar ping used on server latency chips and cluster status nodes.'
  },
  {
    name: 'aetherisFade',
    label: 'Smooth Crossfade',
    category: 'Entrance & Transitions',
    duration: '0.3s',
    easing: 'ease-in-out',
    iteration: '1',
    css: `@keyframes aetherisFade {
  0% { opacity: 0; }
  100% { opacity: 1; }
}`,
    demoType: 'fade',
    description: 'Standard backdrop fade and image load transition.'
  },
  {
    name: 'aetherisNavartDash',
    label: 'SVG Stroke Dash Draw',
    category: 'Vector & Art',
    duration: '2.5s',
    easing: 'linear',
    iteration: 'infinite',
    css: `@keyframes aetherisNavartDash {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -100; }
}`,
    demoType: 'svg',
    description: 'Moving electrical circuit stroke line animation along topological borders.'
  },
  {
    name: 'enter',
    label: 'Generic Pop Enter',
    category: 'Entrance & Transitions',
    duration: '0.25s',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    iteration: '1',
    css: `@keyframes enter {
  0% { opacity: 0; transform: scale(0.92); }
  100% { opacity: 1; transform: scale(1); }
}`,
    demoType: 'pop',
    description: 'Tooltip and contextual popover entrance with subtle scale bounce.'
  }
];

const showroomEffects = [
  {
    name: 'shimmerBorder',
    label: 'Glowing Border Shimmer',
    category: 'Showroom Effects',
    css: `@keyframes shimmerBorder {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
    description: 'Subtle ambient multi-color gradient running along dark card borders.'
  },
  {
    name: 'matrixScanline',
    label: 'Terminal Scanline Sweep',
    category: 'Showroom Effects',
    css: `@keyframes matrixScanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(1000%); }
}`,
    description: 'CRT / retro terminal beam sweep across interactive code views.'
  },
  {
    name: 'skeletonLoading',
    label: 'Skeleton Content Shimmer',
    category: 'Showroom Effects',
    css: `@keyframes skeletonLoading {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}`,
    description: 'Fluid wave placeholder shimmer for async telemetry and model latency charts.'
  }
];

module.exports = {
  keyframesList,
  showroomEffects
};
