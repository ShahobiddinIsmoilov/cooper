// import { CommentProps } from "postcss";

// interface NestedDictionary {
//   [key: string]: NestedDictionary | number;
// }

// interface NestedCommentsProps {
//   comments: CommentProps[];
// }

// function NestedComments({ comments }: NestedCommentsProps) {
//   function nestComments(
//     d: NestedDictionary | number,
//     targetKey: string,
//     newKey: string,
//     newValue: any
//   ): boolean {
//     if (typeof d === "object" && d !== null) {
//       if (targetKey in d) {
//         if (typeof d[targetKey] === "object" && d[targetKey] !== null) {
//           d[targetKey][newKey] = newValue;
//           return true;
//         }
//       } else {
//         for (const value of Object.values(d)) {
//           if (nestComments(value, targetKey, newKey, newValue)) {
//             return true;
//           }
//         }
//       }
//     }
//     return false;
//   }

//   // Example nested dictionary
//   const nestedDict: NestedDictionary = {
//     a: {
//       b: {
//         c: 1,
//         d: 2,
//       },
//       e: 5,
//     },
//     g: {
//       h: 6,
//     },
//   };

//   // Add a new key-value pair ('newKey': 'newValue') to the child dictionary with key 'b' within the nested dictionary
//   if (nestComments(nestedDict, "b", "newKey", "newValue")) {
//     console.log("New key-value pair added successfully:");
//     console.log(nestedDict);
//   } else {
//     console.log("Target key not found.");
//   }

//   return <div>nestedComments</div>;
// }

// export default NestedComments;
