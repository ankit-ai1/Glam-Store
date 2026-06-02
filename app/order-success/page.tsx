import Link from "next/link";
export default function Page() {
  return (
    <div style={{maxWidth:560,margin:"80px auto",textAlign:"center",padding:"0 20px"}}>
      <div style={{width:100,height:100,borderRadius:"50%",background:"linear-gradient(135deg,#673ab7,#e91e8c)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:44,margin:"0 auto 24px"}}>🎉</div>
      <h1 style={{fontSize:32,fontWeight:900,color:"#1a1a2e",marginBottom:8}}>Order Placed!</h1>
      <p style={{fontSize:15,color:"#888",marginBottom:24}}>Your order has been confirmed. You will receive updates via email.</p>
      <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
        <Link href="/profile/orders" style={{padding:"12px 24px",borderRadius:999,border:"2px solid #673ab7",color:"#673ab7",fontWeight:700,fontSize:14}}>Track Order</Link>
        <Link href="/" style={{padding:"12px 24px",borderRadius:999,background:"linear-gradient(90deg,#673ab7,#9c27b0)",color:"#fff",fontWeight:700,fontSize:14}}>Continue Shopping</Link>
      </div>
    </div>
  );
}