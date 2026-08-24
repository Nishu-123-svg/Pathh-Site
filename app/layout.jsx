import './globals.css';

export const metadata = {
  title: 'नित्य नियम पूजा | 6 Daily Sacred Mantras & Prayers',
  description: 'दैनिक पूजा एवं साधना हेतु ६ पावन मंत्र, चालीसा, स्तोत्र व माहात्म्य संग्रह (श्री गणेश चालीसा, संकटनाशनं स्तोत्र, गणेश आरती, श्री हनुमान चालीसा, गीता सप्तम अध्याय माहात्म्य, शिव यजुर मन्त्र)।',
  keywords: [
    'Ganesh Chalisa',
    'Hanuman Chalisa',
    'Ganesh Aarti',
    'Sankata Nashanam Ganesha Stotram',
    'Bhagavad Gita Chapter 7 Mahatmya',
    'Shiv Yajur Mantra',
    'Karpur Gauram',
    'Daily Mantras',
    'Hindu Prayers',
    'नित्य नियम पूजा'
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ea580c',
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased selection:bg-amber-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
