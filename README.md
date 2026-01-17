# PTGameHub 🎮 - Ultimate Free Gaming Discovery

**PTGameHub** เป็นแพลตฟอร์มศูนย์รวมเกมฟรีระดับพรีเมียมที่มาพร้อมระบบค้นหา วิเคราะห์สถิติ และเปรียบเทียบข้อมูลเกมกว่า 400 เกมเพื่อคอเกมตัวจริง พัฒนาด้วยเทคโนโลยีที่ทันสมัยที่สุดเพื่อให้ได้ประสบการณ์การใช้งานที่ลื่นไหลและสวยงาม

[Explore PTGameHub](#) · [View Metrics](/analytics) · [Compare Games](/compare)

---

## ✨ Key Features

- 🔍 **Premium Discovery**: ค้นหาและกรองเกมจากคลังข้อมูลกว่า 400+ เกมด้วยฟิลเตอร์ที่ละเอียด
- ⚖️ **Advanced Comparison**: ระบบเปรียบเทียบสเปกและข้อมูลเกมแบบ Side-by-Side (สูงสุด 3 เกม)
- 📊 **Dynamic Analytics**: ระบบวิเคราะห์ข้อมูลเชิงลึก แสดงผลผ่านแผนภูมิ Recharts ที่สวยงาม
- 🎨 **Vibrant Gamer Aesthetic**: ดีไซน์ล้ำสมัยด้วยธีม "Vibrant Gamer Red" พร้อมเอฟเฟกต์ Glassmorphism และ Antigravity Feel
- 🌐 **Modern i18n**: รองรับ 2 ภาษา (ไทย/อังกฤษ) อย่างสมบูรณ์แบบพร้อมระบบจดจำภาษา
- 🌙 **Smart Dark Mode**: มอบประสบการณ์การเล่นเกมที่สบายตาด้วย OLED-ready Deep Black mode
- ⚡ **Cutting-edge Performance**: รันบน Next.js 14 พร้อมระบบ Caching และ Optimized Rendering

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

### Core

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

### UI & UX

- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Background Effects**: [@tsparticles/react](https://particles.js.org/)
- **Icons**: [React Icons (Remix Icons)](https://react-icons.github.io/react-icons/)
- **Charts**: [Recharts](https://recharts.org/)
- **Themes**: [Next-themes](https://github.com/pacocoursey/next-themes)

## 🚀 การติดตั้งและพัฒนา (Installation)

### Pre-requisites

- Node.js 18.17 หรือสูงกว่า
- npm / yarn / pnpm

### ขั้นตอนการเริ่มโปรเจกต์

1. **Clone กิต**

   ```bash
   git clone https://github.com/your-username/ptgamehub.git
   cd ptgamehub
   ```

2. **ติดตั้ง Dependencies**

   ```bash
   npm install
   ```

3. **รันในโหมด Development**

   ```bash
   npm run dev
   ```

4. **รันบนเบราว์เซอร์**
   เปิด [http://localhost:3000](http://localhost:3000)

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
├── app/                  # Next.js App Router (Layouts, Pages, Providers)
├── components/           # React Components
│   ├── layout/          # Header, Footer, Navigation
│   ├── games/           # Game Cards, Filters, Trending sections
│   ├── ui/              # Common UI, Animations, Spiner, ErrorBoundary
│   └── providers/       # Context & Theme Providers
├── hooks/                # Custom React Hooks (useGames, useTranslation)
├── lib/                  # Utilities, API Fetching, Translations
├── store/                # Zustand State Stores
├── types/                # TypeScript Interface Definition
└── public/               # Static assets & Public images
```

## 🌐 แหล่งข้อมูล (API)

เราใช้ [FreeToGame API](https://www.freetogame.com/api-doc) ในการดึงข้อมูลเกมแบบ Real-time ซึ่งเปิดให้ใช้งานฟรีสำหรับนักศึกษาและนักพัฒนา

## 🤝 ร่วมสนับสนุน

ยินดีรับ Pull Requests เพื่อปรับปรุง UI/UX หรือเพิ่มฟีเจอร์ใหม่ๆ หากพบข้อผิดพลาดสามารถแจ้งผ่าน Issues ได้ทันที

## 📄 License

ลิขสิทธิ์ภายใต้ [MIT License](LICENSE) - © 2025 **PTGameHub** by Petersen

---

**PTGameHub** - _Gaming Evolved._
