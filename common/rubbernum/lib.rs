#![no_std]

#[repr(transparent)]
#[allow(non_camel_case_types)]
#[derive(Default, Debug, Clone, Copy)]
pub struct rubbernum(f64);

impl ::core::cmp::PartialEq for rubbernum {
    #[inline]
    fn eq(&self, other: &Self) -> bool {
        if self.0.is_nan() && other.0.is_nan() {
            return true;
        }
        self.0 == other.0
    }
}

impl ::core::cmp::Eq for rubbernum {}

macro_rules! f {
    ($($t:ident),+) => (
        $(impl From<$t> for rubbernum {
            #[inline(always)]
            fn from(f: $t) -> Self { Self(f as f64) }
        })+
    )
}
f!(u8, u16, u32, u64, u128, usize, i8, i16, i32, i64, i128, isize, f32, f64);

impl From<rubbernum> for f64 {
    #[inline(always)]
    fn from(n: rubbernum) -> f64 { n.0 }
}

impl ::core::fmt::Display for rubbernum {
    #[inline]
    fn fmt(&self, f: &mut ::core::fmt::Formatter) -> ::core::fmt::Result {
        self.0.fmt(f)
    }
}

impl ::core::str::FromStr for rubbernum {
    type Err = ::core::num::ParseFloatError;
    #[inline]
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        s.parse().map(Self)
    }
}
