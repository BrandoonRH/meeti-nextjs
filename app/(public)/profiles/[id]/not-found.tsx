import Link from "next/link";

export default function NotFound() {
	return (
		<main style={{fontFamily: 'system-ui, sans-serif', padding: 40, textAlign: 'center'}}>
			<h1 style={{fontSize: 36, marginBottom: 12}}>Perfil no encontrado</h1>
			<p style={{fontSize: 16, color: '#555', marginBottom: 24}}>
				No se encontró el perfil público del usuario. Es posible que la URL esté equivocada o el perfil haya sido eliminado.
			</p>
			<div>
				<Link href="/" style={{display: 'inline-block', padding: '10px 18px', background: '#0ea5a4', color: '#fff', borderRadius: 6, textDecoration: 'none'}}>
					Volver al inicio
				</Link>
			</div>
		</main>
	);
}
