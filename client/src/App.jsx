import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // 1. สร้าง State เพื่อเก็บข้อมูล Product ทั้งหมด
  const [products, setProducts] = useState([]);

  // 2. สร้างฟังก์ชันสำหรับดึงข้อมูล Product จาก Server
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4001/products");
      // เมื่อได้ข้อมูลมาแล้ว ให้ Update State
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // 3. สร้างฟังก์ชันสำหรับลบข้อมูล Product
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:4001/products/${productId}`);
      // หลังจากลบข้อมูลที่ Server สำเร็จ ให้ Update State ในฝั่ง Client ด้วย
      // โดยการกรองเอา Product ที่ถูกลบออกไป
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // 4. สั่งให้ดึงข้อมูล Product ทันทีที่หน้าเว็บโหลดเสร็จ (ทำงานแค่ครั้งเดียว)
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {/* 5. นำข้อมูลใน State มาแสดงผลทีละชิ้น */}
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div className="product-preview">
              <img
                src={product.image}
                alt={product.name}
                width="350"
                height="350"
              />
            </div>
            <div className="product-detail">
              <h1>Product name: {product.name}</h1>
              <h2>Product price: {product.price} Baht</h2>
              <p>Product description: {product.description}</p>
            </div>

            {/* 6. เมื่อปุ่มถูกคลิก ให้เรียกใช้ฟังก์ชัน handleDelete พร้อมส่ง id ของ Product นั้นๆ ไปด้วย */}
            <button
              className="delete-button"
              onClick={() => handleDelete(product.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;