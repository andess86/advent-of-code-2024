use std::fs::File;
use std::io::{self, BufRead};

fn main() -> io::Result<()> {
    let file = File::open("input.txt")?;
    let reader = io::BufReader::new(file);

    let lines: Vec<String> = reader.lines().collect::<Result<_, _>>()?;

    let mut left_nums = Vec::new();
    let mut right_nums = Vec::new();

    // Read and split the lines, parsing to numbers immediately
    for line in &lines {
        if let Some((left, right)) = line.split_once("   ") {
            let left_num: i32 = left.parse().expect("Left should be a number");
            let right_num: i32 = right.parse().expect("Right should be a number");
            left_nums.push(left_num);
            right_nums.push(right_num);
        }
    }

    // Sort the number vectors
    left_nums.sort();
    right_nums.sort();

    // Calculate differences
    let diffs: Vec<i32> = left_nums
        .iter()
        .zip(right_nums.iter())
        .map(|(left, right)| (left - right).abs())
        .collect();

    // Print individual differences
    for (i, diff) in diffs.iter().enumerate() {
        println!("{} vs {} -> diff: {}", left_nums[i], right_nums[i], diff);
    }

    // Calculate and print total
    let total: i32 = diffs.iter().sum();
    println!("Total difference: {}", total);

    Ok(())
}