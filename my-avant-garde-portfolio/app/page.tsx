'use client';

import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import Scene from '@/components/Scene';

export default function Home() {
  // 内容部分，使用Framer Motion添加出现动画
  const sections = [
    { id: 'intro', text: "Hi, I'm [Your Name]." },
    { id: 'about', text: "A [Your Role] who builds things and solves problems." },
    { id: 'work', text: "View my work", link: "https://your-link-here" },
    { id: 'connect', text: "Let's connect", link: "https://your-social-link" },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 1. 全屏Canvas背景 */}
      <Canvas className="absolute inset-0 bg-black" camera={{ position: [0, 0, 1] }}>
        <Scene />
      </Canvas>

      {/* 2. 内容叠加层 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        {/* 使用滚动容器 */}
        <div className="h-screen snap-y snap-mandatory overflow-y-scroll w-full">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              className="h-screen flex items-center justify-center snap-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {section.link ? (
                <a
                  href={section.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-4xl font-light hover:underline underline-offset-4 decoration-2 decoration-blue-400" // 用高亮色装饰链接
                >
                  {section.text}
                </a>
              ) : (
                <h1 className="text-4xl md:text-6xl font-light text-center">
                  {section.text}
                </h1>
              )}
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}