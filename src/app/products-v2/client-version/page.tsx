'use client';

import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types';
import { useEffect, useState } from 'react';

export default function ProductClientVersion() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	

	useEffect(() => {
		fetchProducts().finally(() => setLoading(false));

	}, []);

	async function fetchProducts() {
		const res = await fetch('https://api.escuelajs.co/api/v1/products');
		if (!res.ok) {
			throw new Error('Failed to fetch products');
		}
		const arr = await res.json();
		setProducts(arr);
	}

	return (
		<div>
			{loading && <p className='text-yellow-400 text-center text-xl mb-4'>Loading...</p>}
			<ul>
				{products.map(product => (
					<ProductCard product={product} key={product.id} />
				))}
			</ul>
		</div>
	);
}
