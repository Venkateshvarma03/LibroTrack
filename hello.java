import java.util.*;
class hello{
    public static void main(String[] args) {
          HashMap<Integer, Integer> map = new HashMap<>();

          for(int i=0;i<nums.length;i++){
            if(map.containsKey(target-nums[i])){
                return new int[]{map.get(target-nums[i]), i};
            }
            map.put(nums[i], i);
          }
      }
}
//     public boolean backtrack(int nums[], int index, int total, List<Integre> signs){
//         if(index == nums.length){
//             if(total == 0){
//                 return true;
//             }
//             return false;
//         }
//         signs.add(1);
//         if(backtrack(nums, index + 1, total + nums[index], signs)) {
//             return true;
//         }
//         signs.remove(signs.size() - 1);
//         signs.add(-1);
//         if(backtrack(nums, index + 1, total - nums[index], signs)) {
//             return true;
//         }
//         signs.remove(signs.size() - 1);
//         return false;
//     }
// }
