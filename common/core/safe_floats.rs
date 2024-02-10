macro_rules! f {
    ($name:ident $type:tt $($t:ident),+) => (
        $(impl From<$t> for $name {
            #[inline(always)]
            fn from(f: $t) -> Self { Self(f as $type) }
        })+
    )
}

macro_rules! safe_float {
    (
        $(
            $(#[$attr:meta])*
            $name:ident($type:tt)
        )+
    ) => ( $(
        $(#[$attr])*
        #[repr(transparent)]
        #[allow(non_camel_case_types)]
        #[derive(Default, Debug, Clone, Copy)]
        pub struct $name($type);

        f!($name $type
            u8, u16, u32, u64, u128, usize,
            i8, i16, i32, i64, i128, isize,
            f32, f64);
        
        impl From<$name> for $type {
            #[inline(always)]
            fn from(n: $name) -> $type { n.0 }
        }

        impl ::core::cmp::PartialEq for $name {
            #[inline]
            fn eq(&self, other: &Self) -> bool {
                if self.0.is_nan() && other.0.is_nan() {
                    return true;
                }
                self.0 == other.0
            }
        }
        
        impl ::core::cmp::Eq for $name {}
        
        impl ::core::fmt::Display for $name {
            #[inline]
            fn fmt(&self, f: &mut ::core::fmt::Formatter) -> ::core::fmt::Result {
                self.0.fmt(f)
            }
        }
    )+ );
}

safe_float!{
    /// A safe 32-bit floating point number.
    /// 
    /// This is a wrapper around `f32` that implements `PartialEq` and `Eq` for `NaN`.
    /// It is preferred to use this type over `f32` when comparing floating point numbers.
    /// And is used all over SafeScript to represent floating point numbers.
    sf32(f32)

    /// A safe 64-bit floating point number.
    /// 
    /// This is a wrapper around `f64` that implements `PartialEq` and `Eq` for `NaN`.
    /// It is preferred to use this type over `f64` when comparing floating point numbers.
    /// And is used all over SafeScript to represent floating point numbers.
    sf64(f64)
}
