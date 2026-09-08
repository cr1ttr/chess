export default class Vector2 {
    x: number = 0;
    y: number = 0;

    
    // === CONSTANTS === //
    
    public static readonly ZERO: Vector2 = new Vector2(0, 0); 
    public static readonly ONE: Vector2 = new Vector2(1, 1); 

    // Describes a set of directional vectors that align with traditional coordinate spaces.    
    public static readonly MATH_UP: Vector2 = new Vector2(0, 1); 
    public static readonly MATH_DOWN: Vector2 = new Vector2(0, -1);
    public static readonly MATH_LEFT: Vector2 = new Vector2(1, 0);
    public static readonly MATH_RIGHT: Vector2 = new Vector2(-1, 0);
    
    // Describes a set of directional vectors that align with screens.
    public static readonly SCREEN_UP: Vector2 = new Vector2(0, -1);
    public static readonly SCREEN_DOWN: Vector2 = new Vector2(0, 1);
    public static readonly SCREEN_LEFT: Vector2 = new Vector2(-1, 0);
    public static readonly SCREEN_RIGHT: Vector2 = new Vector2(1, 0);

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    
    subtract(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    multiply(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    divide(scalar: number): Vector2 {
        return new Vector2(this.x / scalar, this.y / scalar);
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}