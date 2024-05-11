import { GraphQLScalarType,
    Kind,
    ValueNode,} from 'graphql';
const DateType = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value: unknown) {
      return new Date(value as string); // value from the client
    },
    serialize(value: unknown) {
      return (value as Date).getTime(); // value sent to the client
    },
    parseLiteral(ast: ValueNode) {
      if (ast.kind === Kind.INT) {
        return new Date((ast as any).value); // ast value is always in string format
      }
      return null;
    },
  });
  export default DateType