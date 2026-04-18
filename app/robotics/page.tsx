import { Bot, Cog, Cpu, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Robotics — Coming Soon | Appy's Studio",
  description: '3D printed robots and robotic components. Coming soon from Appy\'s Studio.',
  alternates: { canonical: 'https://appysstudio.com/robotics' },
};

export default function RoboticsPage() {
  return (
    <div className="bg-gray-950 min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-32 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />

        <div className="max-w-4xl mx-auto relative text-center">
          {/* Animated icon cluster */}
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center ring-1 ring-purple-500/20">
              <Cog className="w-8 h-8 text-purple-400 animate-[spin_8s_linear_infinite]" />
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center ring-1 ring-purple-500/20">
              <Cpu className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 text-sm font-semibold px-4 py-2 rounded-full mb-8 ring-1 ring-purple-500/20">
            Coming Soon
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
            3D Printed{' '}
            <span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">Robots</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            We&apos;re building a collection of custom 3D printed robots and robotic components.
            Stay tuned!
          </p>

          {/* Back to shop CTA */}
          <Link
            href="/#shop"
            className="inline-flex items-center gap-2 text-purple-300 hover:text-white font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse our 3D Printing catalog
          </Link>
        </div>
      </section>
    </div>
  );
}
