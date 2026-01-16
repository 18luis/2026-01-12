import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Habilita CORS
	app.enableCors({
		origin: 'http://localhost:3000', // La URL de tu frontend Nuxt
		methods: 'GET,PUT,POST,DELETE',
		credentials: true,
	});

	await app.listen(8080);
	console.log('Server starting at :8080');
}
bootstrap();