﻿using System;
using System.Collections.Generic;

namespace ecommerce_freshydeli.scaffold;

public partial class Role
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public bool? State { get; set; }

    public int? CompanyId { get; set; }
}
