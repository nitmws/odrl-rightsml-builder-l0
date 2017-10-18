# ODRL-RightsML Builder Output Files

All the files in this folder have been created by the Builder. The file names follow this design: {name of examples}{RDF serialization format}.{extension}

- name of examples: as defined by the /src/testmain01.ts code, e.g. polAtestImEx24
- RDF seralization format and extension:
  - none with .ttl: [Turtle](https://www.w3.org/TR/turtle/)
  - "=nquads" with .txt: RDF 1.1 [N-Quads](https://www.w3.org/TR/n-quads/) - used as triples
  - "=expanded" with .json: [JSON-LD 1.0](https://www.w3.org/TR/json-ld/) Expanded Document Form
   - "=compact" with .json: [JSON-LD 1.0](https://www.w3.org/TR/json-ld/) Compacted Document Form
   - "=compactnested" with .json: [JSON-LD 1.0](https://www.w3.org/TR/json-ld/) Compacted Document Form with nested nodes.