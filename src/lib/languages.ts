import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { php } from '@codemirror/lang-php';
import { rust } from '@codemirror/lang-rust';

export interface Language {
  id: string;
  name: string;
  extension: () => any;
  defaultCode: string;
  version?: string;
}

export const languages: Language[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    extension: javascript,
    defaultCode: `// JavaScript Code
console.log('Hello, World!');

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('Fibonacci(10):', fibonacci(10));`,
    version: 'Node.js 18'
  },
  {
    id: 'python',
    name: 'Python',
    extension: python,
    defaultCode: `# Python Code
print('Hello, World!')

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print('Fibonacci(10):', fibonacci(10))`,
    version: 'Python 3.11'
  },
  {
    id: 'java',
    name: 'Java',
    extension: java,
    defaultCode: `// Java Code
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        System.out.println("Fibonacci(10): " + fibonacci(10));
    }
    
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}`,
    version: 'Java 17'
  },
  {
    id: 'cpp',
    name: 'C++',
    extension: cpp,
    defaultCode: `// C++ Code
#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    cout << "Hello, World!" << endl;
    cout << "Fibonacci(10): " << fibonacci(10) << endl;
    return 0;
}`,
    version: 'GCC 11'
  },
  {
    id: 'php',
    name: 'PHP',
    extension: php,
    defaultCode: `<?php
// PHP Code
echo "Hello, World!\\n";

function fibonacci($n) {
    if ($n <= 1) return $n;
    return fibonacci($n - 1) + fibonacci($n - 2);
}

echo "Fibonacci(10): " . fibonacci(10) . "\\n";
?>`,
    version: 'PHP 8.2'
  },
  {
    id: 'rust',
    name: 'Rust',
    extension: rust,
    defaultCode: `// Rust Code
fn fibonacci(n: u32) -> u32 {
    if n <= 1 {
        return n;
    }
    fibonacci(n - 1) + fibonacci(n - 2)
}

fn main() {
    println!("Hello, World!");
    println!("Fibonacci(10): {}", fibonacci(10));
}`,
    version: 'Rust 1.70'
  }
];
