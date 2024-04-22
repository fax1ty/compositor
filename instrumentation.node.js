import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "compositor",
  }),
  spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
  instrumentations: [
    getNodeAutoInstrumentations({
      // Generally doesn't give meaningful information
      "@opentelemetry/instrumentation-fs": {
        enabled: false,
      },
    }),
  ],
});
sdk.start();
