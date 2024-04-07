import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";
import * as express from "express";

async function bootstrap() {
  const staticPath = join(__dirname, "profile-images");
  const PORT = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use("/profile-images", express.static(staticPath));

  const config = new DocumentBuilder()
    .setTitle("Cosmetic Advisor API")
    .setDescription("REST API")
    .setVersion("1.0.0")
    .addTag("Aimira")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

bootstrap();
