using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class updateordertable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderStateId",
                schema: "oss-ecommerce",
                table: "Order",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderStateId",
                schema: "oss-ecommerce",
                table: "Order");
        }
    }
}
