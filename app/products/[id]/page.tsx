"use client";
import Link from "next/link";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { ALL_PRODUCTS } from "@/lib/data";
import "@/styles/home.css";
export default function Page({ params }: { params: { id: string } }) {
  const { dispatch, inWish } = useCart();
  const p = ALL_PRODUCTS.find(x => x.id === params.id) || ALL_PRODUCTS[0];
  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"32px 20px"}}>
      <Link href="/" style={{color:"#673ab7",fontWeight:600,fontSize:13,display:"inline-block",marginBottom:20}}>← Back</Link>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48}}>
        <div style={{borderRadius:20,overflow:"hidden",background:"#f8f4ff",aspectRatio:"1",position:"relative"}}>
          <img src={p.img} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        </div>
        <div>
          <p style={{fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.16em",color:"#673ab7",marginBottom:8}}>{p.brand}</p>
          <h1 style={{fontSize:"clamp(1.4rem,2.5vw,2rem)",fontWeight:900,color:"#1a1a2e",marginBottom:12,lineHeight:1.2}}>{p.name}</h1>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:4,background:"#673ab7",color:"#fff",padding:"4px 10px",borderRadius:999}}>
              <Star size={12} fill="white" color="white"/><span style={{fontWeight:700,fontSize:12}}>{p.rating}</span>
            </div>
            <span style={{fontSize:12,color:"#aaa"}}>({p.reviews} reviews)</span>
          </div>
          <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:20}}>
            <span style={{fontSize:28,fontWeight:900,color:"#1a1a2e"}}>₹{p.price}</span>
            <span style={{fontSize:16,color:"#bbb",textDecoration:"line-through"}}>₹{p.mrp}</span>
            <span style={{fontSize:13,fontWeight:700,color:"#e91e8c"}}>{p.discount}% OFF</span>
          </div>
          <div style={{display:"flex",gap:12}}>
            <button onClick={()=>dispatch({type:"ADD",item:{id:p.id,name:p.name,brand:p.brand,price:p.price,mrp:p.mrp,img:p.img}})} style={{flex:1,padding:"14px",background:"linear-gradient(90deg,#673ab7,#9c27b0)",color:"#fff",borderRadius:999,fontWeight:700,fontSize:14,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <ShoppingBag size={16}/> Add to Bag
            </button>
            <button onClick={()=>dispatch({type:"TOGGLE_WISH",id:p.id})} style={{width:52,height:52,borderRadius:"50%",border:"1.5px solid #e0d5f5",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:inWish(p.id)?"#e91e8c":"#888"}}>
              <Heart size={20} fill={inWish(p.id)?"#e91e8c":"none"}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}