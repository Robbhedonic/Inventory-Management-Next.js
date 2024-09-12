// src/app/page.js




import Header from '../components/header';
import Footer from '../components/footer'; 

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <div 
        className="absolute inset-0 bg-cover bg-center z-[-1]" 
        style={{ backgroundImage: 'url("https://browsi.com/wp-content/uploads/2021/04/UX-1-e1665064262698.png")' }}
      />
      <main className="relative z-10 flex flex-col md:flex-row flex-1">
        <div className="flex-1 flex flex-col justify-center p-4">
          <h1 className="text-6xl font-bold text-white font-mono bg-opacity-50 p-4 mb-4 rounded text-center">
            Welcome to the Inventory Management App
          </h1>
        </div>
        <div className="flex-1 p-4 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md h-full flex flex-col items-center justify-center">
            <img 
  src="https://img.freepik.com/free-vector/warehouse-worker-checking-inventory_3446-395.jpg" // URL actualizada
  alt="Inventory Management System"
  className="w-full h-full object-cover rounded-t-lg"
/>
            <div className="p-4">
              {/* */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}