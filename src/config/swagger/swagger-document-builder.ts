import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class SwaggerDocumentBuilder {
    constructor(
        private readonly app: INestApplication
    ) { }

    private build() {
        const documentBuilder = new DocumentBuilder()
            .setTitle('Basketball Academy API')
            .setDescription('Basketball Academy API')
            .setVersion(process.env.API_VERSION as string)
            .addTag('users')
            .addTag('auth')
            .addBearerAuth()
            .addGlobalResponse({
                status: 400,
                description: 'Bad request',
            })
            .addGlobalResponse({
                status: 401,
                description: 'Unauthorized',
            })
            .addGlobalResponse({
                status: 403,
                description: 'Forbidden',
            })
            .addGlobalResponse({
                status: 404,
                description: 'Not found',
            })
            .addGlobalResponse({
                status: 409,
                description: 'Conflict',
            })
            .addGlobalResponse({
                status: 500,
                description: 'Internal server error',
            })
            .build();

        return documentBuilder;
    }

    public buildDocument() {
        const document = SwaggerModule.createDocument(this.app, this.build());
        SwaggerModule.setup(`api/${process.env.API_VERSION}/docs`, this.app, document);
    }
}