//! The virtual machine for SafeScript.

use common::Result;

pub mod natives;

#[derive(Debug)]
pub struct Builder {
    corelib: bool,
    natives: Vec<natives::NativeObject>
}

impl Builder {
    pub fn new() -> Self {
        Self {
            corelib: true,
            natives: Vec::new()
        }
    }
    pub fn new_without_corelib() -> Self {
        let mut r = Self::new();
        r.corelib = false;
        r
    }
    pub fn add_native_function(
        &mut self,
        _name: &str,
        _func: fn(&[natives::NativeObject]) -> Result
    ) {
        
    }
    pub fn build(self) -> Vm {
        Vm {
            _natives: self.natives
        }
    }
    pub fn build_and_init(self) -> Vm {
        let mut rt = self.build();
        rt.init();
        rt
    }
}

#[derive(Debug)]
pub struct Vm {
    _natives: Vec<natives::NativeObject>
}

impl Vm {
    pub fn builder() -> Builder {
        Builder::new()
    }
    pub fn init(&mut self) {
        
    }
    pub fn run_string<T: ToString>(&mut self, code: T) -> Result {
        let _tokenstream = common::tokens::parse(code);

        Ok(())
    }
}
