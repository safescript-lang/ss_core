macro_rules! f {
    ($name:ident $type:tt $($t:ident),+) => (
        $(impl From<$t> for $name {
            #[inline(always)]
            fn from(f: $t) -> Self { Self(f as $type) }
        })+
    )
}

macro_rules! safe_float {
    ($name:ident $type:tt) => (
        #[repr(transparent)]
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
    )
}

safe_float!(Safe32 f32);
safe_float!(Safe64 f64);
